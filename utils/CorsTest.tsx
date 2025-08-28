'use client';

import { useState } from 'react';
import { testCors } from '../utils/api';

export default function CorsTest() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestCors = async () => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await testCors();
      setResult(response);
      console.log('✅ CORS test successful:', response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ CORS test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4'>🧪 Prueba de CORS</h2>

      <button
        onClick={handleTestCors}
        disabled={isLoading}
        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors'
      >
        {isLoading ? 'Probando...' : 'Probar CORS'}
      </button>

      {error && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
          <p className='text-red-600 text-sm'>❌ Error: {error}</p>
        </div>
      )}

      {result && (
        <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-md'>
          <p className='text-green-600 text-sm'>
            ✅ CORS funcionando correctamente!
          </p>
          <pre className='mt-2 text-xs text-gray-600'>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className='mt-4 text-sm text-gray-600'>
        <p>
          <strong>URLs permitidas:</strong>
        </p>
        <ul className='list-disc list-inside mt-1'>
          <li>http://localhost:3000</li>
          <li>http://localhost:3001</li>
          <li>http://localhost:3002</li>
          <li>http://127.0.0.1:3000</li>
          <li>http://127.0.0.1:3001</li>
          <li>http://127.0.0.1:3002</li>
        </ul>
      </div>
    </div>
  );
}
