var colsToRemoveInput = document.getElementById('cols-to-remove');

function write() {
	var nums = colsToRemoveInput.value.replace(/\D/,'');
	if (!isNaN(nums)) {
		chrome.storage.sync.set({
			nums: nums
		}, function () {
			console.log(arguments);
		});
	}
}

function read() {
	chrome.storage.sync.get({nums: 1}, function (stored) {
		colsToRemoveInput.value = stored.nums;
	});
}

document.getElementById('save').addEventListener('click', write);
document.addEventListener('DOMContentLoaded', read);
