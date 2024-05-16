const mongoose = require('mongoose');

const BenchmarkSchema = new mongoose.Schema({
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
  averageExecutionTime: {
    type: Number,
  },
  totalAverage: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Benchmark = mongoose.model('ExecutionTime', BenchmarkSchema);

module.exports = Benchmark;
