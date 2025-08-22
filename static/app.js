const API = location.origin + '/api';

async function fetchPatients(){
  const res = await fetch(API + '/patients');
  return await res.json();
}

async function fetchRecords(){
  const res = await fetch(API + '/records');
  return await res.json();
}

function toOption(p){ return `<option value="${p.id}">${p.firstName} ${p.lastName} (ID:${p.id})</option>`; }

async function loadPatientsToSelect(){
  const patients = await fetchPatients();
  const sel = document.getElementById('patientSelect');
  sel.innerHTML = '<option value="">-- Selecciona paciente --</option>' + patients.map(toOption).join('');
}

async function refreshRecords(){
  const list = document.getElementById('recordsList');
  const records = await fetchRecords();
  if(records.length===0){ list.innerHTML = '<i>No hay historias aún</i>'; return; }
  list.innerHTML = records.map(r => `
    <div class="record">
      <strong>Paciente:</strong> ${r.patient.firstName} ${r.patient.lastName} (ID:${r.patient.id})<br/>
      <strong>Fecha:</strong> ${new Date(r.createdAt).toLocaleString()}<br/>
      <strong>Enfermero/a:</strong> ${r.nurse}<br/>
      <strong>Motivo:</strong> ${r.reason}<br/>
      <details><summary>Ver detalles</summary>
        <p><strong>Anamnesis:</strong> ${r.anamnesis||'-'}</p>
        <p><strong>Examen físico:</strong> ${r.physicalExam||'-'}</p>
        <p><strong>Plan:</strong> ${r.treatmentPlan||'-'}</p>
        <p><strong>Notas:</strong> ${r.notes||'-'}</p>
      </details>
    </div>`).join('');
}

document.getElementById('patientForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = Object.fromEntries(fd.entries());
  // birthDate -> null if empty
  if(!body.birthDate) delete body.birthDate;
  const res = await fetch(API + '/patients', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
  if(res.ok){
    e.target.reset();
    await loadPatientsToSelect();
    await refreshRecords();
    alert('Paciente creado ✅');
  } else {
    alert('Error al crear paciente');
  }
});

document.getElementById('recordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const obj = Object.fromEntries(fd.entries());
 /*
  if (!obj.patientId) {
    alert('Selecciona un paciente');
    return;
  }
*/
  const payload = {
    patient: { id: Number(obj.patientId) },
    nurse: obj.nurse,
    reason: obj.reason,
    anamnesis: obj.anamnesis,
    physicalExam: obj.physicalExam,
    treatmentPlan: obj.treatmentPlan,
    notes: obj.notes
  };

  console.log("Datos a enviar:", payload); 

  const res = await fetch(API + '/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    e.target.reset();
    await refreshRecords();
    alert('Historia clínica guardada');
  } else {
    const text = await res.text();
    alert('Error: ' + text);
  }
});

// init
(async ()=>{ await loadPatientsToSelect(); await refreshRecords(); })();