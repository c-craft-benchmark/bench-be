const mongoose = require('mongoose');

const AsyncPerformanceBenchmarkSchema = new mongoose.Schema({
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
  averageAsyncExecution: {
    type: Number,
  },
  totalAverageAsyncExecution: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AsyncPerformanceBenchmark = mongoose.model('AsyncPerformanceBenchmark', AsyncPerformanceBenchmarkSchema);

module.exports = AsyncPerformanceBenchmark;