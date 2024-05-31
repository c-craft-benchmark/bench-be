const express = require('express');
const router = express.Router();

const benchmarkController = require('../controllers/benchmarkController');

router.post('/start-execution-time', benchmarkController.startBenchmark);
router.post('/start-memory-usage', benchmarkController.startMemoryBenchmark);
router.post('/start-page-load', benchmarkController.startPageLoadBenchmark);
router.post('/async-performance-benchmark', benchmarkController.startAsyncPerformanceBenchmark);
router.post('/compare-performance', benchmarkController.startOptimizationBenchmark);

router.get('/results', benchmarkController.getBenchmarkResults);
router.get('/execution-time', benchmarkController.getExecutionTimeResults);

module.exports = router;