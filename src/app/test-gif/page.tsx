"use client";

export default function TestGif() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">Test de GIFs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* GIF del día 7 que funciona */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Día 7 - osito_a_osita.gif (funciona)</h2>
          <img
            src="/images/osito_a_osita.gif"
            alt="GIF día 7"
            className="max-w-full h-auto rounded"
            style={{ maxHeight: '300px' }}
          />
          <p className="text-sm text-gray-600 mt-2">Tamaño: ~93KB</p>
        </div>

        {/* GIF del día 8 problemático */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Día 8 - emoxito.gif (problemático)</h2>
          <img
            src="/images/emoxito.gif"
            alt="GIF día 8"
            className="max-w-full h-auto rounded"
            style={{ maxHeight: '300px' }}
            onLoad={() => console.log('emoxito.gif cargado correctamente')}
            onError={(e) => {
              console.error('Error cargando emoxito.gif:', e);
              e.currentTarget.style.border = '2px solid red';
            }}
          />
          <p className="text-sm text-gray-600 mt-2">Tamaño: ~973KB</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Abre las herramientas de desarrollador para ver los logs</p>
        <a href="/calendario" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Volver al calendario
        </a>
      </div>
    </div>
  );
}