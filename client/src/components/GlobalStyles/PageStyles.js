import styled from 'styled-components'

export const PageTitle = styled.div`
    text-transform: capitalize;
    padding: 8px 12px 6px 12px;
    border-radius: 27px;
    border: 2px solid #ff6e29;
    font-weight: 700;
    color: #ff6e29
`

export const PageContainer = styled.div`
    margin-top: 65px;
    padding: 16px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat
`

export const SplitContainer = styled.div`
    display: flex;
    .first-child{
        margin-right: 16px
        flex-basis: 20%;
    }
    .second-child{
        flex-basis: 80%
    }
`

export const Input = styled.input`
    border: 1px solid #b6b6b6;
    outline: 0;
    font-size: 16px;
    padding: 10px 12px;
    border-radius: 4px;
    width: 100%;
`

export const FormTitle = styled.h3`
    font-size: 26px;
    font-weight: 600;
    color: #969696
`

export const FormButton = styled.button`
    font-size: 14px;
    font-weight: 600;
    color: white;
    padding: 10px 20px;
    text-align: center;
    outline: 0;
    border: 0;
    border-radius: 40px;
    background: #ff6e29;
    cursor: pointer;
    display: block
`

export const Image = styled.div`
    display: flex;
    align-items: center;
    justify-content: center
    overflow: hidden;
    border-radius: 4px;
    min-width: 160px;
    min-height: 160px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat
`

export const SearchBoxContainer = styled.div`
    padding: 20px;
    background: #00000063;
    border-radius: 6px;
`