const lockScreen = document.getElementById('lockScreen');
const memoryRoom = document.getElementById('memoryRoom');
const unlockForm = document.getElementById('unlockForm');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const lockButton = document.getElementById('lockButton');
const backdrop = document.querySelector('.photo-backdrop');
const modal = document.getElementById('memoryModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

const backdropPhotos = [
	'https://commons.wikimedia.org/wiki/Special:FilePath/MS_Dhoni_in_2011.jpg?width=1600',
	'https://commons.wikimedia.org/wiki/Special:FilePath/MS_Dhoni_2.jpg?width=1600',
	'https://commons.wikimedia.org/wiki/Special:FilePath/Mahendra_Singh_Dhoni_batting.JPG?width=1600'
];
let photoIndex = 0;

function showRoom() {
	lockScreen.style.display = 'none';
	memoryRoom.classList.add('visible');
	memoryRoom.setAttribute('aria-hidden', 'false');
	backdrop.style.backgroundImage = `url("${backdropPhotos[photoIndex]}")`;
	window.setInterval(() => {
		photoIndex = (photoIndex + 1) % backdropPhotos.length;
		backdrop.style.backgroundImage = `url("${backdropPhotos[photoIndex]}")`;
	}, 6000);
}

unlockForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (passwordInput.value.trim().toLowerCase() === 'thala7') {
		errorMessage.classList.remove('show');
		showRoom();
	} else {
		errorMessage.classList.add('show');
		passwordInput.select();
	}
});

lockButton.addEventListener('click', () => {
	memoryRoom.classList.remove('visible');
	memoryRoom.setAttribute('aria-hidden', 'true');
	lockScreen.style.display = 'flex';
	passwordInput.value = '';
	passwordInput.focus();
});

document.querySelectorAll('.view-memory').forEach((button) => {
	button.addEventListener('click', () => {
		const card = button.closest('.memory-card');
		modalTitle.textContent = card.dataset.title;
		modalDescription.textContent = card.dataset.description;
		modal.classList.add('open');
		modal.setAttribute('aria-hidden', 'false');
	});
});

function closeModal() {
	modal.classList.remove('open');
	modal.setAttribute('aria-hidden', 'true');
}

document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
	if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') closeModal();
});
