const mongoose = require('mongoose');

const PageLoadBenchmarkSchema = new mongoose.Schema({
  testType: {
    type: String,
    required: true,
  },
  testCode: {
    type: String,
    required: true,
  },
  testConfig: {
    type: Object,
    required: true,
  },
  results: {
    type: Array,
    required: true,
  },
  averagePageLoadTime: {
    type: Number,
  },
  totalAveragePageLoadTime: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const PageLoadBenchmark = mongoose.model('PageLoadBenchmark', PageLoadBenchmarkSchema);

module.exports = PageLoadBenchmark;
