import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Filtrele from './Filtrele';
import './EvListele.css';

function EvListele({ onLogout }) {
  const [evBilgileri, setEvBilgileri] = useState([]);
  const [filteredEvler, setFilteredEvler] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://v1.nocodeapi.com/hasretnisa/google_sheets/fzwmhMIUEgGymcyg?tabId=sayfa1");
        if (!response.ok) {
          throw new Error("Veri alınamadı!");
        }
        const data = await response.json();
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Veri yapısı geçersiz!");
        }

        const evler = data.data.map(item => ({
          id: parseInt(item.id),
          oda: parseInt(item.oda),
          banyo: parseInt(item.banyo),
          bahce: item.bahce === 'var',
          balkon: parseInt(item.balkon),
          konum: item.konum,
          cephe: item.cephe,
          esya: item.esya === 'eşyalı',
          kat: parseInt(item.kat),
        }));

        setEvBilgileri(evler);
        setFilteredEvler(evler);
        setLoading(false);
      } catch (error) {
        console.error('Hata:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const matchesFilter = (value, filter) => {
    if (filter.type === 'any') return true;
    if (filter.type === 'must-have') return value == filter.value; 
    if (filter.type === 'must-not-have') return value != filter.value; 
    return false;
  };

  const handleFilter = (filters) => {
    const filtered = evBilgileri.filter(ev => {
      const odaMatch = matchesFilter(ev.oda, filters.oda);
      const banyoMatch = matchesFilter(ev.banyo, filters.banyo);
      const bahceMatch = matchesFilter(ev.bahce ? 'var' : 'yok', filters.bahce);
      const balkonMatch = matchesFilter(ev.balkon, filters.balkon);
      const konumMatch = matchesFilter(ev.konum, filters.konum);
      const cepheMatch = matchesFilter(ev.cephe, filters.cephe);
      const katMatch = matchesFilter(ev.kat, filters.kat);
      const esyaMatch = matchesFilter(ev.esya ? 'eşyalı' : 'eşyasız', filters.esya);

      return odaMatch && banyoMatch && bahceMatch && balkonMatch && konumMatch && cepheMatch && katMatch && esyaMatch;
    });

    setFilteredEvler(filtered);
  };

  const handleClear = () => {
    setFilteredEvler(evBilgileri);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login"); 
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="ev-listesi">
      <h1 className="baslik">GÜNCEL EVLER</h1>
      <button className='eklebuton' onClick={() => navigate('/ev-ekle')}>Ev Ekle</button>
      <button className='cikisyap' onClick={handleLogoutClick}>Çıkış Yap</button>

      <Filtrele onFilter={handleFilter} onClear={handleClear} />

      <div className="ev-kartlar">
        {filteredEvler.map((ev, index) => (
          <Card
            key={index}
            title={`Ev Numarası: ${ev.id}`}
            bordered={false}
            style={{ width: 300, margin: '10px' }}
            onClick={() => navigate(`/ev/${ev.id}`)}
          >
            <p><strong>Konum:</strong> {ev.konum}</p>
            <p><strong>Oda Sayısı:</strong> {ev.oda}</p>
            <p><strong>Banyo Sayısı:</strong> {ev.banyo}</p>
            <p><strong>Balkon Sayısı:</strong> {ev.balkon}</p>
            <p><strong>Kat Bilgisi:</strong> {ev.kat}</p>
            <p><strong>Bahçe:</strong> {ev.bahce ? 'Var' : 'Yok'}</p>
            <p><strong>Cephe:</strong> {ev.cephe}</p>
            <p><strong>Eşya Durumu:</strong> {ev.esya ? 'Eşyalı' : 'Eşyasız'}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EvListele;
