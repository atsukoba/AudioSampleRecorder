import struct
import wave

rate = 44100


def output_wave(path, frames) -> None:
    # Python 3.X allows the use of the with statement
    # with wave.open(path,'w') as output:
    #     # Set parameters for output WAV file
    #     output.setparams((2,2,rate,0,'NONE','not compressed'))
    #     output.writeframes(frames)

    output = wave.open(path,'w')
    output.setparams((2, 2, rate, 0, 'NONE', 'not compressed'))
    output.writeframes(frames)
    output.close()


def binary_to_wav(data) -> None:
    packedData = map(lambda v:struct.pack('h',v), data)
    frames = b''.join(packedData)
    output_wave('sounds/example.wav', frames)
