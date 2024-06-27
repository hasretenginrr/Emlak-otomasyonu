import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin, Alert, Modal } from 'antd';
import './EvIcerik.css';

function EvIcerik() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ev, setEv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://v1.nocodeapi.com/hasretnisa/google_sheets/fzwmhMIUEgGymcyg?tabId=sayfa1");
        if (!response.ok) {
          throw new Error('Veri alınamadı!');
        }
        const result = await response.json();
        const data = result.data;
        const evDetay = data.find(item => parseInt(item.id) === parseInt(id));
        if (!evDetay) {
          throw new Error("Belirtilen ID'ye sahip ev bulunamadı!");
        }
        setEv(evDetay);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleOnayla = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Modal.success({
        title: 'Onaylandı',
        content: 'Seçtiğiniz ev onaylandı ve mail atıldı.',
        onOk: () => navigate('/ev-listele'), 
      });
    }, 2000);
  };

  if (loading) {
    return <Spin tip="Yükleniyor..." />;
  }

  if (error) {
    return <Alert message="Hata" description={error} type="error" showIcon />;
  }

  if (!ev) {
    return <Alert message="Hata" description="Belirtilen ID'ye sahip ev bulunamadı!" type="error" showIcon />;
  }

  return (
    <div className="ev-icerik">
      <Card title="Ev Detayları" className="ev-card">
        <p><strong>Ev numarası:</strong> {ev.id}</p>
        <p><strong>Oda:</strong> {ev.oda}</p>
        <p><strong>Banyo:</strong> {ev.banyo}</p>
        <p><strong>Bahçe:</strong> {ev.bahce}</p>
        <p><strong>Balkon:</strong> {ev.balkon}</p>
        <p><strong>Konum:</strong> {ev.konum}</p>
        <p><strong>Cephe:</strong> {ev.cephe}</p>
        <p><strong>Eşya Durumu:</strong> {ev.esya}</p>
        <p><strong>Kat Bilgisi:</strong> {ev.kat}</p>
        <Button
          type="primary"
          onClick={handleOnayla}
          loading={submitting}
          className="onayla-button"
        >
          {submitting ? 'İşleniyor...' : 'Onayla ve Mail At'}
        </Button>
      </Card>
    </div>
  );
}

export default EvIcerik;
