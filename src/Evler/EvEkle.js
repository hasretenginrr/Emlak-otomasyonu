import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EvEkle.css';

function EvEkle() {
  const [ev, setEv] = useState({
    id: '',
    oda: '',
    banyo: '',
    bahce: false,
    balkon: '',
    konum: '',
    cephe: '',
    esya: false,
    kat: ''
  });

  const [existingData, setExistingData] = useState([]);
  const navigate = useNavigate();

  const fetchExistingData = async () => {
    try {
      const response = await fetch("https://v1.nocodeapi.com/hasretnisa/google_sheets/fzwmhMIUEgGymcyg?tabId=sayfa1", {
        method: 'GET',
      });
      const data = await response.json();
      setExistingData(data.data);
    } catch (error) {
      console.error('Mevcut veriler alınamadı:', error);
    }
  };

  useEffect(() => {
    fetchExistingData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEv({
      ...ev,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ID'nin benzersiz olup olmadığını kontrol et
    const idExists = existingData.some(row => row[0] === ev.id.toString());
    if (idExists) {
        alert('Bu ID zaten mevcut, lütfen başka bir ID girin.');
        return;
    }

    try {
        // Payload'ı oluştur
        const payload = [
            [
                ev.id.toString(),    
                ev.oda.toString(),   
                ev.banyo.toString(), 
                ev.bahce ? 'var' : 'yok', 
                ev.balkon.toString(), 
                ev.konum,            
                ev.cephe,            
                ev.esya ? 'eşyalı' : 'eşyasız', 
                ev.kat.toString()    
            ]
        ];

        console.log('Payload:', payload);

        
        const response = await fetch("https://v1.nocodeapi.com/hasretnisa/google_sheets/fzwmhMIUEgGymcyg?tabId=sayfa1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Hata Detayları:', errorData);
            throw new Error('Veri eklenemedi!');
        }

        
        navigate('/');

    } catch (error) {
        console.error('Hata:', error);
    }
};



  return (
    <div className="ev-ekle">
      <h1>Ev Ekle</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ev Numarası:
          <input type="number" name="id" value={ev.id} onChange={handleChange} required />
        </label>
        <label>
          Oda Sayısı:
          <input type="number" name="oda" value={ev.oda} onChange={handleChange} required />
        </label>
        <label>
          Banyo Sayısı:
          <input type="number" name="banyo" value={ev.banyo} onChange={handleChange} required />
        </label>
        
        <label>
          Balkon Sayısı:
          <input type="number" name="balkon" value={ev.balkon} onChange={handleChange} required />
        </label>
        <label>
          Konum:
          <input type="text" name="konum" value={ev.konum} onChange={handleChange} required />
        </label>
        <label>
          Cephe:
          <input type="text" name="cephe" value={ev.cephe} onChange={handleChange} required />
        </label>
        <label>
          Kat:
          <input type="number" name="kat" value={ev.kat} onChange={handleChange} required />
        </label>
        <label>
          Eşya:
          <input type="checkbox" name="esya" checked={ev.esya} onChange={handleChange} />
        </label>
        <label>
          Bahçe:
          <input type="checkbox" name="bahce" checked={ev.bahce} onChange={handleChange} />
        </label>
        
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default EvEkle;
