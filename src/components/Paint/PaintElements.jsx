import styled from 'styled-components';
// import { Link } from 'react-scroll';

export const PaintContainer = styled.div`
    position: fixed;
    padding: 30px;
    border: 1px solid black;
`;

export const PaintToolWrapper = styled.div`
    position: fixed;
    bottom: 0;
    padding-bottom: 200px;
`;

export const PaintTools = styled.div`
    display: flex;
    flex-direction: column;
    width: 10%;
    padding: 20px;
`;

export const PaintH1 = styled.div`
    font-size: 35px;
    padding: 10px;
    text-align: center;
`;

export const PaintH2 = styled.div`
    font-size: 25px;
    padding: 10px;
`;

export const PaintToolInput = styled.div`
    --webkit-appearance: none;
`;

export const PaintToolLabel = styled.div`
    height: 180px;
    width: 240px;
    border: 2px solid #18f98d;
    position: relative;
    margin: auto;
    border-radius: 10px;
`;

export const PaintBtnWrapper = styled.div`
    position: fixed;
    bottom: 0;
    padding-bottom: 5px;
`
export const UndoRedoBtn = styled.div`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#01BF71' : '#010606')};
    white-space: nowrap;
    padding: 15px;
    /* padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')}; */
    color: ${({ dark }) => (dark ? '#010606' : '#ffffff')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => (primary ? '#ffffff' : '#01BF71')};
    }
`