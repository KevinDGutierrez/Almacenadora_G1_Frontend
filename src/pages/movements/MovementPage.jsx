import React, { useState } from "react";

export default function InventarioApp() {
  const [entradaData, setEntradaData] = useState({
    producto: "",
    cantidad: "",
    empleado: "",
    motivo: "",
    destino: "",
  });

  const [salidaData, setSalidaData] = useState({
    producto: "",
    cantidad: "",
    empleado: "",
    motivo: "",
    destino: "",
  });

  const [productoHistorial, setProductoHistorial] = useState("");
  const [historial, setHistorial] = useState([]);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [informe, setInforme] = useState([]);

  // Función para registrar entrada
  const handleEntrada = () => {
    const nuevaEntrada = {
      ...entradaData,
      tipo: "Entrada",
      fecha: new Date().toISOString(),
    };
    setHistorial([...historial, nuevaEntrada]);
    setEntradaData({
      producto: "",
      cantidad: "",
      empleado: "",
      motivo: "",
      destino: "",
    });
  };

  // Función para registrar salida
  const handleSalida = () => {
    const nuevaSalida = {
      ...salidaData,
      tipo: "Salida",
      fecha: new Date().toISOString(),
    };
    setHistorial([...historial, nuevaSalida]);
    setSalidaData({
      producto: "",
      cantidad: "",
      empleado: "",
      motivo: "",
      destino: "",
    });
  };

  // Función para obtener historial por producto
  const obtenerHistorial = () => {
    const historialFiltrado = historial.filter(
      (item) => item.producto === productoHistorial
    );
    setHistorial(historialFiltrado);
  };

  // Función para generar informe de movimientos
  const generarInforme = () => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const resumen = {};

    historial.forEach((item) => {
      const fechaItem = new Date(item.fecha);
      if (fechaItem >= inicio && fechaItem <= fin) {
        if (!resumen[item.producto]) {
          resumen[item.producto] = { totalEntradas: 0, totalSalidas: 0 };
        }
        if (item.tipo === "Entrada") {
          resumen[item.producto].totalEntradas += parseInt(item.cantidad);
        } else if (item.tipo === "Salida") {
          resumen[item.producto].totalSalidas += parseInt(item.cantidad);
        }
      }
    });

    const informeArray = Object.keys(resumen).map((producto) => ({
      nombreProducto: producto,
      ...resumen[producto],
    }));

    setInforme(informeArray);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sistema de Inventario</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Registrar Entrada</h2>
        <input
          placeholder="Producto ID"
          value={entradaData.producto}
          onChange={(e) =>
            setEntradaData({ ...entradaData, producto: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Cantidad"
          value={entradaData.cantidad}
          onChange={(e) =>
            setEntradaData({ ...entradaData, cantidad: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Empleado ID"
          value={entradaData.empleado}
          onChange={(e) =>
            setEntradaData({ ...entradaData, empleado: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Motivo"
          value={entradaData.motivo}
          onChange={(e) =>
            setEntradaData({ ...entradaData, motivo: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Destino"
          value={entradaData.destino}
          onChange={(e) =>
            setEntradaData({ ...entradaData, destino: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <button
          onClick={handleEntrada}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Registrar Entrada
        </button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Registrar Salida</h2>
        <input
          placeholder="Producto ID"
          value={salidaData.producto}
          onChange={(e) =>
            setSalidaData({ ...salidaData, producto: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Cantidad"
          value={salidaData.cantidad}
          onChange={(e) =>
            setSalidaData({ ...salidaData, cantidad: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Empleado ID"
          value={salidaData.empleado}
          onChange={(e) =>
            setSalidaData({ ...salidaData, empleado: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Motivo"
          value={salidaData.motivo}
          onChange={(e) =>
            setSalidaData({ ...salidaData, motivo: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          placeholder="Destino"
          value={salidaData.destino}
          onChange={(e) =>
            setSalidaData({ ...salidaData, destino: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <button
          onClick={handleSalida}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Registrar Salida
        </button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Historial de Producto</h2>
        <input
          placeholder="Producto ID"
          value={productoHistorial}
          onChange={(e) => setProductoHistorial(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={obtenerHistorial}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Obtener Historial
        </button>
        <ul className="mt-2">
          {historial.map((item, index) => (
            <li key={index} className="border-b py-1">
              {item.tipo} - Cantidad: {item.cantidad} - Fecha:{" "}
              {new Date(item.fecha).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Informe de Movimientos</h2>
        <input
          placeholder="Fecha Inicio (YYYY-MM-DD)"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border p-1 mr-2"
        />
        <input
          placeholder="Fecha Fin (YYYY-MM-DD)"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={generarInforme}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          Generar Informe
        </button>
        <ul className="mt-2">
          {informe.map((item, index) => (
            <li key={index} className="border-b py-1">
              {item.nombreProducto} - Entradas: {item.totalEntradas}, Salidas:{" "}
              {item.totalSalidas}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}