export default {
	data() {
		return {
			documentWidth: 0,
			rotateBlock: false,
			visibleSlide: 2
		}
	},
	mounted() {
		if (window.innerWidth <= 1440) {
			this.rotateBlock = true
			this.visibleSlide = 1
		} else {
			this.rotateBlock = false
			this.visibleSlide = 2
		}
		window.addEventListener('resize', function (e) {
			if (+e.target.innerWidth <= 1440) {
				console.log(+e.target.innerWidth);
				this.rotateBlock = true
				console.log(this.rotateBlock);
				this.visibleSlide = 1
			} else {
				console.log(this.rotateBlock);
				this.rotateBlock = false
				this.visibleSlide = 2
			}
		});
	}
}
