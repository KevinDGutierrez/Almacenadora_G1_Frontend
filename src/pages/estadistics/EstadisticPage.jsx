import React, { useEffect, useState } from 'react';
import { getEstadisticas } from '../../services/estadisticService';  
import { useNavigate } from 'react-router-dom';
import './Estadistic.css';

export default function Estadisticas() {
  const [estadisticas, setEstadisticas] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
    let imageUrl;

    const fetchEstadisticas = async () => {
      try {
        const imageBlob = await getEstadisticas();
        imageUrl = URL.createObjectURL(imageBlob);
        setEstadisticas(imageUrl);
      } catch (error) {
        console.error("Error al cargar estadísticas", error);
        navigate("/estadistic");
      }
    };

    fetchEstadisticas();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Estadísticas de Productos</h2>
      {estadisticas ? (
        <img src={estadisticas} alt="Gráfico de estadísticas" />
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}
