import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Demo from './Demo'
import './styles.css'

storiesOf('Ellipsus', module).add('demo', () => <Demo />)

