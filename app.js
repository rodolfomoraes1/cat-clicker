var model = {
	admin: false,
	currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : '434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : '4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : '22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : '1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : '9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
}

var octopus = {
	init: function () {
		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
		adminView.init();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCatList: function() {
		return model.cats;
	},

	changeCat: function (newCat) {
		model.currentCat = newCat;

		catView.render();
		adminView.render();
	},

	setCurrentCat: function (newCat) {
		model.currentCat.name = newCat.name;
		model.currentCat.imgAttribution = newCat.imgAttribution;
		model.currentCat.clickCount = newCat.clickCount;

		catView.render();
		catListView.render();
	},

	onClickIncrement: function () {
		model.currentCat.clickCount++;
		catView.render();
	},

	getAdminValue: function () {
		return model.admin;
	},

	setAdminValue: function () {
		model.admin = !model.admin;
		adminView.render();
	}
}

var catView = {

	init: function() {
    	this.catNameElement = document.getElementById('cat-name');
    	this.countElement = document.getElementById('cat-count');

    	this.catNameElement.addEventListener('click', function(e) {
    		octopus.onClickIncrement();
    	});

    	this.render();
	},

	render: function() {
		this.currentCat = octopus.getCurrentCat();

		this.countElement.textContent = this.currentCat.clickCount;
    	this.catNameElement.textContent = this.currentCat.name;
	}
}

var catListView = {

	init: function() {
    	this.catListElement = document.getElementById('cat-list');

    	this.catList = octopus.getCatList();
		for (var i = this.catList.length - 1; i >= 0; i--) {
			var getCatLI = this.getCatRow(i, this.catList);
			this.catListElement.appendChild(getCatLI());
		}
	},

	getCatRow: function (i, myCatList) {
		var catListLI = document.createElement('li');
	  	catListLI.textContent = myCatList[i].name;
	  	return function () {
	  		catListLI.textContent = myCatList[i].name;
	      	catListLI.addEventListener('click', function(e) {
	      		octopus.changeCat(myCatList[i]);
			});
	  		return catListLI
	  	}
	},

	render: function() {
		this.refreshList();
	},

	refreshList: function () {
		for (var i = this.catListElement.childNodes.length - 1; i >= 0; i--) {
			this.catListElement.removeChild(this.catListElement.childNodes[i]);
		}

		this.init();
	}

	//Here we did a closure for the cat to create a private context.
	//The render function could also be: 
	//render: function() {
	//	this.catList = octopus.getCatList();
	//	for (var i = this.catList.length - 1; i >= 0; i--) {
	//		var getCatLI = (function (i, myCatList) {
	//			var catListLI = document.createElement('li');
	//		  	catListLI.textContent = myCatList[i].name;
	//		  	return function () {
	//		  		catListLI.textContent = myCatList[i].name;
	//		      	catListLI.addEventListener('click', function(e) {
	//		      		octopus.changeCat(myCatList[i]);
	//				});
	//		  		return catListLI
	//		  	}
	//		})(i, this.catList);
	//		this.catListElement.appendChild(getCatLI());
	//	}
	//}
}

var adminView = {
	init: function () {
		this.catNameInput = document.getElementById('cat-name-input');
		this.catImageLinkInput = document.getElementById('cat-image-link-input');
		this.catClickCountInput = document.getElementById('cat-click-count-input');

		this.adminForm = document.getElementById('adminForm');
		this.adminForm.style.visibility = 'hidden';

		this.render();
	},

	render: function () {
		var currentCat = octopus.getCurrentCat();

		this.catNameInput.value = currentCat.name;
		this.catImageLinkInput.value = currentCat.imgAttribution;
		this.catClickCountInput.value = currentCat.clickCount;

		this.renderAdminForm();
	},

	enableAdmin: function () {
		octopus.setAdminValue();
	},

	renderAdminForm: function () {
		if (octopus.getAdminValue()) {
			this.adminForm.style.visibility = 'visible';
		} else {
			this.adminForm.style.visibility = 'hidden';
		}
	},

	setCatData: function () {
		var newCat = {
			clickCount : this.catClickCountInput.value,
            name : this.catNameInput.value,
            imgAttribution : this.catImageLinkInput.value
		};

		octopus.setCurrentCat(newCat);
	}
}

octopus.init();