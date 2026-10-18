"""Generate nonverbal source-filter grunts. No text, voice recording or TTS. Requires numpy."""
from pathlib import Path
import wave
import numpy as np

RATE = 22050
ROOT = Path(__file__).resolve().parents[1] / 'public/audio'
ROOT.mkdir(exist_ok=True)

def resonator(signal, frequencies, bandwidth):
    radius = np.exp(-np.pi * bandwidth / RATE)
    a = 2 * radius * np.cos(2 * np.pi * frequencies / RATE)
    result = np.zeros_like(signal)
    for i in range(2,len(signal)):
        result[i] = (1-radius) * signal[i] + a[i]*result[i-1] - radius*radius*result[i-2]
    return result

for index in range(4):
    rng = np.random.default_rng(9041 + index)
    duration = [2.2,2.6,1.8,2.4][index]
    t = np.arange(int(duration*RATE)) / RATE
    pitch = 94 + 16*np.sin(2*np.pi*.7*t+index) + 7*np.sin(2*np.pi*4.4*t) + rng.normal(0,1,len(t))
    phase = np.cumsum(pitch / RATE) % 1
    # Irregular vocal-fold pulses mixed with turbulent breath and subharmonics.
    glottal = (np.exp(-phase*12)-.09) * (0.65+0.35*np.sin(2*np.pi*37*t))
    breath = rng.normal(0,.18,len(t))
    source = glottal + breath
    throat = np.zeros_like(t)
    for center,travel,weight,bw in [(310,95,1.0,90),(730,160,.65,150),(1540,110,.26,240)]:
        freq = center + travel*np.sin(t*2.7 + index*.9)
        throat += weight * resonator(source,freq,bw)
    envelope = np.zeros_like(t)
    # Unpitched rasp / guttural fragments; deliberately no sequence of words.
    for start,length in [(0.1,.54),(.78,.38),(1.34,duration-1.5)]:
        if length <= 0: continue
        local = np.clip((t-start)/length,0,1)
        envelope += np.sin(np.pi*local)**1.7 * ((t>=start)&(t<start+length))
    voice = np.tanh(throat*2.5)*envelope
    # Soft room reflections.
    for delay,level in [(.083,.18),(.141,.10),(.233,.05)]:
        shift = int(delay*RATE)
        voice[shift:] += voice[:-shift] * level
    voice -= voice.mean()
    voice *= .55 / max(np.max(np.abs(voice)),.001)
    voice[:220] *= np.linspace(0,1,220); voice[-1100:] *= np.linspace(1,0,1100)
    with wave.open(str(ROOT/f'murmur-{index}.wav'),'wb') as audio:
        audio.setnchannels(1); audio.setsampwidth(2); audio.setframerate(RATE)
        audio.writeframes((voice*32767).astype('<i2').tobytes())
    print(f'murmur-{index}.wav: {duration:.1f}s, peak {np.max(np.abs(voice)):.3f}')
