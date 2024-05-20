const mongoose = require('mongoose');

const OptimizationBenchmarkSchema = new mongoose.Schema({
  optimizationTechnique: {
    type: String,
    required: true,
  },
  testCodeBefore: {
    type: String,
    required: true,
  },
  testCodeAfter: {
    type: String,
    required: true,
  },
  testConfig: {
    type: Object,
    required: true,
  },
  resultsBefore: {
    type: Array,
    required: true,
  },
  resultsAfter: {
    type: Array,
    required: true,
  },
  averageExecutionTimeBefore: {
    type: Number,
  },
  averageExecutionTimeAfter: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const OptimizationBenchmark = mongoose.model('OptimizationBenchmark', OptimizationBenchmarkSchema);

module.exports = OptimizationBenchmark;