import React, { Component } from 'react'
import { Link } from 'gatsby'
import { TimelineMax, Power1 } from 'gsap'

import TransitionLink from '../../plugins/gatsby-plugin-transition-link'
import Layout from '../components/layout'
import DisplayState from '../components/DisplayState'

class Index extends Component {
  constructor(props) {
    super(props)

    this.verticalAnimation = this.verticalAnimation.bind(this)

    this.layoutContents = React.createRef()
    this.transitionCover = React.createRef()
  }

  verticalAnimation = (time, direction) => {
    const directionTo = direction == 'up' ? '-100%' : '100%'
    const directionFrom = direction == 'up' ? '100%' : '-100%'

    // convert ms to s for gsap
    const seconds = time / 1000

    return new TimelineMax()
      .set(this.transitionCover, { y: directionFrom })
      .to(this.transitionCover, seconds / 2, {
        y: '0%',
        ease: Power1.easeInOut,
      })
      .set(this.layoutContents, { opacity: 0 })
      .to(this.transitionCover, seconds / 2, {
        y: directionTo,
        ease: Power1.easeIn,
      })
  }

  render() {
    return (
      <Layout>
        <section ref={n => (this.layoutContents = n)}>
          <h1>Hi people</h1>
          <p>Check out these sick transitions.</p>

          <Link to="/page-2">Go to page 2 normally</Link>
          <br />
          <TransitionLink
            to="/page-2"
            exitFor={1000}
            entryIn={600}
            exitFn={time => this.verticalAnimation(time, 'down')}
            entryState={{ animation: 'fromBottom' }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing up" role="img">
              👇
            </span>{' '}
            and animate in the next page
          </TransitionLink>
          <br />
          <TransitionLink
            to="/page-2"
            exitFor={1200}
            exitFn={time => this.verticalAnimation(time, 'up')}
            entryIn={500}
            entryState={{ layoutTheme: 'dark' }}
          >
            Go to page 2 that way{' '}
            <span aria-label="pointing up" role="img">
              ☝️
            </span>
            and give us a dark theme when we get there.
          </TransitionLink>

          <DisplayState />
        </section>
        <div
          ref={n => (this.transitionCover = n)}
          style={{
            position: 'absolute',
            background: '#4b2571',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            transform: 'translateY(100%)',
          }}
        />
      </Layout>
    )
  }
}

export default Index
