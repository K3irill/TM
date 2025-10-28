'use client'
import React from 'react'
import { ContainerStyled } from './styled'

export default function Container({ children }: { children: React.ReactNode }) {
	return <ContainerStyled>{children}</ContainerStyled>
}
