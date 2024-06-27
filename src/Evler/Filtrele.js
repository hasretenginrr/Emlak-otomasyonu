import React, { useState } from 'react';
import './Filtrele.css';
import logo2 from '../image/ara-bul2.png'; 

const Filtrele = ({ onFilter, onClear }) => {
const [filters, setFilters] = useState({
oda: { value: '', type: 'any' },
banyo: { value: '', type: 'any' },
bahce: { value: '', type: 'any' },
balkon: { value: '', type: 'any' },
konum: { value: '', type: 'any' },
cephe: { value: '', type: 'any' },
kat: { value: '', type: 'any' },
esya: { value: '', type: 'any' }
});

const handleChange = (e) => {
const { name, value } = e.target;
const [filterName, filterType] = name.split('-');
setFilters({
...filters,
[filterName]: {
...filters[filterName],
[filterType]: value
}
});
};

const handleSubmit = (e) => {
e.preventDefault();
onFilter(filters);
};

const handleClear = () => {
const clearedFilters = {
oda: { value: '', type: 'any' },
banyo: { value: '', type: 'any' },
bahce: { value: '', type: 'any' },
balkon: { value: '', type: 'any' },
konum: { value: '', type: 'any' },
cephe: { value: '', type: 'any' },
kat: { value: '', type: 'any' },
esya: { value: '', type: 'any' }
};
setFilters(clearedFilters);
onClear();
};

return (
<div className="filtre-form">
<img src={logo2} className='logo2'></img>
<h2 className='filtrelebaslik'>Ev Filtrele</h2>
<form onSubmit={handleSubmit}>
{['oda', 'banyo', 'balkon', 'konum', 'kat'].map((field) => (
<div key={field}>
<label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
<input
type="text"
name={`${field}-value`}
value={filters[field].value}
onChange={handleChange}
/>
<select
name={`${field}-type`}
value={filters[field].type}
onChange={handleChange}
>
<option value="any">Farketmez</option>
<option value="must-have">Mutlaka Olmalı</option>
<option value="must-not-have">Mutlaka Olmamalı</option>
</select>
</div>
))}
<div>
<label>Bahçe:</label>
<select
         name="bahce-value"
         value={filters.bahce.value}
         onChange={handleChange}
       >
<option value="">Seçiniz</option>
<option value="var">Var</option>
<option value="yok">Yok</option>
</select>
<select
         name="bahce-type"
         value={filters.bahce.type}
         onChange={handleChange}
       >
<option value="any">Farketmez</option>
<option value="must-have">Mutlaka Olmalı</option>
<option value="must-not-have">Mutlaka Olmamalı</option>
</select>
</div>
<div>
<label>Cephe:</label>
<select
         name="cephe-value"
         value={filters.cephe.value}
         onChange={handleChange}
       >
<option value="">Seçiniz</option>
<option value="Kuzey">Kuzey</option>
<option value="Güney">Güney</option>
<option value="Doğu">Doğu</option>
<option value="Batı">Batı</option>
</select>
<select
         name="cephe-type"
         value={filters.cephe.type}
         onChange={handleChange}
       >
<option value="any">Farketmez</option>
<option value="must-have">Mutlaka Olmalı</option>
<option value="must-not-have">Mutlaka Olmamalı</option>
</select>
</div>
<div>
<label>Eşya Durumu:</label>
<select
         name="esya-value"
         value={filters.esya.value}
         onChange={handleChange}
       >
<option value="">Seçiniz</option>
<option value="eşyalı">Eşyalı</option>
<option value="eşyasız">Eşyasız</option>
</select>
<select
         name="esya-type"
         value={filters.esya.type}
         onChange={handleChange}
       >
<option value="any">Farketmez</option>
<option value="must-have">Mutlaka Olmalı</option>
<option value="must-not-have">Mutlaka Olmamalı</option>
</select>
</div>
<div className="form-buttons">
<button type="submit">Filtrele</button>
<button type="button" onClick={handleClear}>Filtreleri Temizle</button>
</div>
</form>
</div>
);
};

export default Filtrele;