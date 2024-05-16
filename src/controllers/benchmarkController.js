const Benchmark = require('../models/ExecutionTime');
const PageLoadBenchmark = require('../models/PageLoad');
const MemoryBenchmark = require('../models/MemoryUsage');
const AsyncPerformanceBenchmark = require('../models/AsyncPerformanceBenchmark');


const { performance } = require('perf_hooks');

exports.startBenchmark = async (req, res) => {
  try {
    const { testType, testCode, testConfig } = req.body;

    if (!testType || !testCode || !testConfig) {
      return res.status(400).json({ success: false, error: "Harap berikan testType, testCode, dan testConfig." });
    }

    const iterations = testConfig.iterations || 1;

    const results = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      eval(testCode); 
      const endTime = performance.now();

      const executionTime = endTime - startTime;

      results.push(executionTime);
    }

    const averageExecutionTime = results.reduce((total, current) => total + current, 0) / results.length;
    const totalAverage = `${averageExecutionTime.toFixed(2)} ms`;

    const benchmark = await Benchmark.create({
      testType,
      testCode,
      testConfig,
      results,
      averageExecutionTime,
      totalAverage 
    });

    res.status(201).json({ success: true, message: `Rata-rata execution time dari ${iterations} iterasi: ${totalAverage}`, data: benchmark });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.startMemoryBenchmark = async (req, res) => {
    try {
        const { testType, testCode, testConfig } = req.body;
      
        if (!testType || !testCode || !testConfig) {
            return res.status(400).json({ success: false, error: "Harap berikan testType, testCode, dan testConfig." });
        }
  
        const iterations = testConfig.iterations || 1;
  
        const results = [];
  
        for (let i = 0; i < iterations; i++) {
            const used = process.memoryUsage().heapUsed / 1024 / 1024; 
            eval(testCode); 
            const newUsed = process.memoryUsage().heapUsed / 1024 / 1024; 
            const memoryUsage = newUsed - used; 
        
            results.push(memoryUsage);
        }
  
        const averageMemoryUsage = results.reduce((total, current) => total + current, 0) / results.length;
        const totalAverageMemoryUsage = averageMemoryUsage * iterations;

        const benchmark = await MemoryBenchmark.create({
            testType,
            testCode,
            testConfig,
            results,
            averageMemoryUsage,
            totalAverageMemoryUsage

        });
  
        const message = `Rata-rata penggunaan memori dari ${iterations} iterasi: ${averageMemoryUsage.toFixed(2)} MB`;
  
        res.status(201).json({ success: true, message, data: benchmark });
    } catch (error) {
        // Tangani kesalahan
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.startPageLoadBenchmark = async (req, res) => {
    try {
        // Ambil nilai yang diperlukan dari request body
        const { testType, testCode, testConfig } = req.body;

        // Pastikan testType, testCode, dan testConfig tersedia
        if (!testType || !testCode || !testConfig) {
            return res.status(400).json({ success: false, error: "Harap berikan testType, testCode, dan testConfig." });
        }

        // Ambil nilai iterations dari testConfig atau gunakan nilai default 1 jika tidak ada
        const iterations = testConfig.iterations || 1;

        // Inisialisasi array untuk menyimpan hasil dari setiap iterasi
        const results = [];

        // Lakukan iterasi sebanyak nilai yang diberikan
        for (let i = 0; i < iterations; i++) {
            // Mulai mengukur waktu muat halaman
            const start = performance.now();

            // Jalankan kode yang diuji (misalnya, simulasi pengisian halaman)
            eval(testCode); // Eval digunakan di sini untuk menjalankan kode dari string (Ini harus digunakan dengan hati-hati)

            // Selesaikan pengukuran waktu muat halaman
            const end = performance.now();


            const pageLoadTime = end - start;

            results.push(pageLoadTime);
        }

        const averagePageLoadTime = results.reduce((total, current) => total + current, 0) / results.length;
        const totalAveragePageLoadTime = averagePageLoadTime * iterations;


        // Simpan hasil benchmark ke dalam database
        const pageLoadBenchmark = await PageLoadBenchmark.create({
            testType,
            testCode,
            testConfig,
            results,
            averagePageLoadTime,
            totalAveragePageLoadTime
        });

        // Kirim respons berhasil bersama dengan data benchmark yang disimpan
        res.status(201).json({ success: true, data: pageLoadBenchmark });
    } catch (error) {
        // Tangani kesalahan
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.startAsyncPerformanceBenchmark = async (req, res) => {
    try {
        const { testType, testCode, testConfig } = req.body;
      
        if (!testType || !testCode || !testConfig) {
            return res.status(400).json({ success: false, error: "Harap berikan testType, testCode, dan testConfig." });
        }
  
        const iterations = testConfig.iterations || 1;
  
        const results = [];
  
        for (let i = 0; i < iterations; i++) {
            const startTime = Date.now();
            await eval(testCode); 
            const endTime = Date.now(); 
            const executionTime = endTime - startTime;
        
            results.push(executionTime);
        }
  
        const averageAsyncExecution = results.reduce((total, current) => total + current, 0) / results.length;
        const totalAverageAsyncExecution = iterations * averageAsyncExecution;
        const benchmark = await AsyncPerformanceBenchmark.create({
            testType,
            testCode,
            testConfig,
            results,
            averageAsyncExecution,
            totalAverageAsyncExecution
        });
  
        const message = `Rata-rata waktu eksekusi dari ${iterations} iterasi: ${averageAsyncExecution} ms`;
  
        res.status(201).json({ success: true, message, data: benchmark });
    } catch (error) {
        // Tangani kesalahan
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getMemoryBenchmarkResults = async (req, res) => {
    try {
        const memoryBenchmarkResults = await Benchmark.find({ testType: 'memory_usage' });
  
        res.status(200).json({ success: true, data: memoryBenchmarkResults });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getBenchmarkResults = async (req, res) => {
  try {
    const benchmarks = await Benchmark.find();
    res.status(200).json({ success: true, data: benchmarks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getExecutionTimeResults = async (req, res) => {
    try {
      // Mengambil hasil benchmark dengan testType "execution_time"
      const executionTimeResults = await Benchmark.find({ testType: 'execution_time' });
  
      res.status(200).json({ success: true, data: executionTimeResults });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };    