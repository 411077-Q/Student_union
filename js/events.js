// 活動與特約店家頁面邏輯（範例資料與篩選、Modal）
const sampleEvents = [
  { id:1, type:'workshop', title:'履歷健檢工作坊', date:'2026-09-01', detail:'免費，需報名' },
  { id:2, type:'party', title:'迎新茶會', date:'2026-09-10', detail:'現場有小點心' },
  { id:3, type:'discount', title:'校外書局 8 折', date:'2026-12-31', detail:'出示學生證' },
];

function renderEvents(list){
  const container = document.getElementById('events-list');
  if(!container) return;
  container.innerHTML = '';
  if(list.length === 0){
    container.innerHTML = '<p>沒有符合的活動或特約店家。</p>';
    return;
  }
  list.forEach(e => {
    const div = document.createElement('div');
    div.className = 'event-item';
    div.innerHTML = `<h3>${e.title}</h3><p class="muted">${e.date} • ${e.type}</p><p>${e.detail}</p><button data-id="${e.id}" class="open-detail">查看詳情</button>`;
    container.appendChild(div);
  });
}

function openModal(content){
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  if(!modal || !modalContent) return;
  modalContent.innerHTML = content;
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  const modal = document.getElementById('modal');
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
}

document.addEventListener('DOMContentLoaded', function(){
  renderEvents(sampleEvents);

  const category = document.getElementById('event-category');
  const search = document.getElementById('event-search');

  function applyFilter(){
    let filtered = sampleEvents.slice();
    if(category && category.value !== 'all') filtered = filtered.filter(e => e.type === category.value);
    if(search && search.value.trim()){
      const q = search.value.trim().toLowerCase();
      filtered = filtered.filter(e => (e.title + ' ' + e.detail).toLowerCase().includes(q));
    }
    renderEvents(filtered);
  }

  if(category) category.addEventListener('change', applyFilter);
  if(search) search.addEventListener('input', applyFilter);

  document.body.addEventListener('click', function(e){
    if(e.target.matches('.open-detail')){
      const id = Number(e.target.dataset.id);
      const item = sampleEvents.find(s=>s.id===id);
      if(item) openModal(`<h2>${item.title}</h2><p>${item.date} • ${item.type}</p><p>${item.detail}</p>`);
    }
    if(e.target.matches('#modal-close')) closeModal();
    if(e.target.id === 'modal') closeModal();
  });

  // modal close button
  const mc = document.getElementById('modal-close');
  if(mc) mc.addEventListener('click', closeModal);
});
