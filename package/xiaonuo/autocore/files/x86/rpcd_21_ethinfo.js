'use strict';
'require rpc';

var callLuciETHInfo = rpc.declare({
	object: 'luci',
	method: 'getETHInfo',
	expect: { '': {} }
});

return L.Class.extend({
	title: _('Ethernet Information'),

	load: function() {
		return Promise.all([
			L.resolveDefault(callLuciETHInfo(), {})
		]);
	},

	render: function(data) {
		var ethinfo = Array.isArray(data[0].ethinfo) ? data[0].ethinfo : [];

		var table = E('div', { 'class': 'table' }, [
			E('div', { 'class': 'tr table-titles' }, [
				E('div', { 'class': 'th' }, _('Ethernet Name')),
				E('div', { 'class': 'th' }, _('Link Status')),
				E('div', { 'class': 'th' }, _('Speed')),
				E('div', { 'class': 'th' }, _('Duplex'))
			])
		]);

		cbi_update_table(table, ethinfo.map(function(info) {
			var exp1;
			var exp2;

			if (info.status == "yes")
				exp1 = _('Link Up');
			else if (info.status == "no")
				exp1 = _('Link Down');

			if (info.duplex == "Full")
				exp2 = _('Full Duplex');
			else if (info.duplex == "Half")
				exp2 = _('Half Duplex');
			else
				exp2 = _('-');

			return [
				info.name,
				exp1,
				info.speed,
				exp2
			];
		}));

		return E([
			table
		]);
	}
});
