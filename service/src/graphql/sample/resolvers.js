require('dotenv').config()

import uuid from 'uuid'
import pubsub from '../../pubsub'

import { log, print } from 'io.maana.shared'

const SELF = process.env.SERVICE_ID || 'io.maana.template'

// dummy in-memory store
//const filter = {}

const dsp = require("digitalsignals")

//IIRFilter(filter: String, cutOff: Int, sampleRate: Int): String
export const resolver = {
  Query : {

    //can only accept highpass or lowpass
    IIRFilter: (_, { filter, cutOff, resonance, sampleRate, signal }) => {
      if(filter == "LOWPASS"){
        filter = dsp.LOWPASS
      }else{
        filter = dsp.HIGHPASS
      }
      var filter = new dsp.IIRFilter(filter, cutOff,resonance,sampleRate);
      filter.process(signal)
      return signal
    },

    generateSignal: (_, { osc, frequency, amplitude, bufferSize, sampleRate }) => {

      if(osc == "SINEWAVE"){
        osc= dsp.SINEWAVE
      }

      var osc = new dsp.Oscillator(osc, frequency, amplitude, bufferSize, sampleRate);
      osc.generate();
      return osc.signal

    }

  }
}
