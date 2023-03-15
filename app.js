let position = 0;
let prevPosition = null
const resum = document.querySelectorAll('.resume-content')
const imgs = document.querySelectorAll('.image')
const rightarrow = document.querySelector('.right-arrow')
const leftarrow = document.querySelector('.left-arrow')
const steppers = document.querySelectorAll('.stepper')
const months = document.querySelectorAll('.month')

function resume() {
    resum.forEach((r, i) => {

        // let logo = r.querySelector('.logo') // animation de logo au dessus du texte
        let title = r.querySelector('.title')
        let text = r.querySelector('.text')

        r.removeAttribute('style')

        let translateX = 80
        let translateXtitle = 100
        let translateXtext = 100
        let opacity = 1

        if(i === position) {
            translateX = 0
            translateXtitle = 0
            translateXtext = 0
            opacity = 1
        } else if(i < position) {
            translateX = -80
            translateXtitle = -100
            translateXtext = -50
            opacity = 0
        } else if(i > position) {
            translateX = 80
            translateXtitle = 100
            translateXtext = 50
            opacity = 0
        }

        // logo.style.opacity = opacity // animation de logo au dessus du texte
        // logo.style.transform = `translateX(${translateX}px)` // animation de logo au dessus du texte

        title.style.opacity = opacity
        title.style.transform = `translateX(${translateXtitle}px)`

        text.style.opacity = opacity
        text.style.transform = `translateX(${translateXtext}px)`
    });
}

function images() {
    imgs.forEach((img, i) => {

        let translateX

        if(i === position) {
            translateX = 0
        } else if(i < position) {
            translateX = -422
        } else if(i > position){
            translateX = 422
        }

        img.style.transform = `translateX(${translateX}px)`
    })
}

function nav(e) {
    let direction = 0

    if(e.target.classList.contains('left-arrow') && position > 0) {
        direction--
    } else if(e.target.classList.contains('right-arrow') && position >= 0 && position < (resum.length - 1)) {
        direction++
    }

    prevPosition = position
    position = position + direction

    if(position === 0) {
        e.target.style.opacity = 0.5
    }

    resume()
    images()
    checkArrow()
    stepper()
    month()
}

function checkArrow() {
    if(position === 0) {
        leftarrow.style.opacity = 0.5
    } else if(position > 0 && position < (resum.length - 1)) {
        rightarrow.removeAttribute('style')
        leftarrow.removeAttribute('style')
    } else if(position === (resum.length - 1)) {
        rightarrow.style.opacity = 0.5
    }
}

function stepper() {
    steppers.forEach((stepper, i) => {
        if(i > position) {
            stepper.style.opacity = 0.5
        } else {
            stepper.style.opacity = 1
        }

        if(stepper.previousElementSibling) {
            if(position === i) {
                stepper.previousElementSibling.firstElementChild.style.transform = 'scaleX(1)'
            } else if(position < i) {
                stepper.previousElementSibling.firstElementChild.removeAttribute('style')
            }
        }
    })
}

function month() {
    months.forEach((a, i) => {
        let month = a.querySelectorAll('span')

        opacity = 1
        translateX = 0

        if(i === position) {
            opacity = 1
        } else if(i < position) {
            opacity = 0
            translateX = -30
        } else if(i > position) {
            opacity = 0
            translateX = 30
        }

        month.forEach((span, j) => {
            if(position === i) {

                if(months[i-1] && !months[i+1]) {
                    let child = months[i-1].querySelectorAll('span')[j]

                    if(child === span) {
                        child.style.transition = '0ms'
                    }
                } else if(!months[i-1] && months[i+1]) {
                    let child = months[i + 1].querySelectorAll('span')[j]

                    if (child === span) {
                        child.style.transition = '0ms'
                    }
                } else if(months[i-1] && months[i+1]) {
                    let childPrev = months[i - 1].querySelectorAll('span')[j]
                    let childNext = months[i + 1].querySelectorAll('span')[j]

                    if(childPrev !== span && prevPosition < position) {
                        span.style.removeProperty('transition')
                        if(childNext === span) {
                            childNext.style.transition = '0ms'
                        }
                    } else if(childNext === span && prevPosition > position) {
                        setTimeout(() => {
                            span.style.removeProperty('transition')
                        }, 250);
                    }
                }
            }
            span.style.opacity = opacity
            span.style.transform = `translateX(${translateX}px)`
        })
    })
}

resume()
images()
checkArrow()
stepper()
month()