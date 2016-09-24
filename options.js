var colsToRemoveInput = document.getElementById('cols-to-remove');
var newHostInput = document.getElementById('new-host');
var hostList = document.getElementById('added-hosts');

var hosts;


function addHost () {
	var host = newHostInput.value;
	host = host.replace(/^\s*/,'').replace(/\s*$/,'');
	hosts.push(host);
	renderHosts();
	newHostInput.value = '';

}

function renderHosts() {
	hostList.innerHTML = hosts.map(function (host) {
		return '<option value="' + host + '">' + host + '</option>'
	}).join('');

}

function write() {
	var nums = colsToRemoveInput.value.replace(/\D/,'');
	if (!isNaN(nums)) {
		chrome.storage.sync.set({
			nums: nums,
			hosts: hosts
		}, function () {
         document.getElementById('status').innerHTML = 'Saved!';
         setTimeout(function () {
            document.getElementById('status').innerHTML = '';
         }, 800);
		});
	}
}

function read() {
	chrome.storage.sync.get({nums: 1, hosts: []}, function (stored) {
		colsToRemoveInput.value = stored.nums;
		hosts = stored.hosts;
		renderHosts();
	});
}

document.getElementById('save').addEventListener('click', write);
document.getElementById('add-host').addEventListener('click', addHost);
document.addEventListener('DOMContentLoaded', read);
