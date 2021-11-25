import styled from 'styled-components';

export const PaintContainer = styled.div`
    /* position: fixed; */
    padding: 30px;
`;

export const PaintCanvasWrapper = styled.div`
    border: 3px solid #4b0082;
    border-radius: 10px;
`;

export const PaintToolWrapper = styled.div`
    /* width: 100%; */
    height: 400px;
    /* padding-bottom: 150px; */
    /* border: 1px solid red; */
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 70px;
    padding-left: 40px;
`;

export const PaintToolLabelWrapper = styled.div`
    padding: 5px;
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

export const PaintP = styled.div`
    font-size: 10px;
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
`;

export const PaintToolInput = styled.div`
    --webkit-appearance: none;

    &:checked {
        background-color: #4b0082;
    }
`;

export const PaintToolLabel = styled.div`
    height: 100px;
    width: 120px;
    border: 4px solid #4b0082;
    position: relative;
    margin: auto;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #4b0082;
    }
`;

export const PaintSpan = styled.div`
    font-size: 15px;
    font-weight: 700;
    position: absolute;
    top: 70%;
    left: 70%;
    transform: translate(-50%, -80%);
`

export const PaintIcon = styled.div`
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -80%);
`;

export const PaintBtnWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    padding-bottom: 5px;
    padding-right: 40px;
`
export const UndoRedoBtn = styled.div`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#01BF71' : '#010606')};
    white-space: nowrap;
    padding: 15px;
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