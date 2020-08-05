export const iframeStyles = () => {
  return `
  body {
    font-family: 'Roboto', sans-serif;
  }
.sq-appointment-button {
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    font-family: Montserrat;
    font-weight: 600;
    max-width: 100%!important;
    white-space: normal!important;
    border-radius: 40px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
}
@media (max-width: 768px) {
    .sq-appointment-button {
      box-sizing: border-box;
    }
  }
  
  .container {
      display: flex;
      flex-direction: column;
      padding: 5px 5px;
      width: 98%;
      height: 98%;
      background: #e8e1e1;
  }
  .mine-grid{
    height: 460px;
    width: 430px;
      background: grey;
      display: flex;
      flex-wrap: wrap;
      margin: 10px auto;
  }

  .mine-grid div {
    height: 40px;
    width: 40px;
    border-style: solid;
    border-color: #bbb #888 #666 #aaa;
    border-width: 3px 2px 3px 1px;
    background: #ccc;
    font-weight: bold;
  }

  .mine-header {
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
  }
  .mine-timer {

  }
  .modal-close {
    margin: 10px 2px 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .mine-timer {
      font-weight: bold;
  }
  .close-icon{
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: block;
  }
  .close-icon span {
    width: 20px;
    height: 3px;
    background-color: black;
    margin: 4px 0;
    transition: 0.4s;
    border-radius: 5px;
    display: block;
}
.close-icon .bar1 {
    -webkit-transform: rotate(-45deg) translate(-2px, 2px);
    transform: rotate(-45deg) translate(-2px, 2px);
}
.close-icon .bar2 {
    opacity:0;
}
.close-icon .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}

.bomb {
    background: orange;
}
.checked{
    border-color: #f1eded #cec7c7 #cec2c2 #d0c5c5 !important;
    background: #e6dede !important;
}
.mine-grid-footer {
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 10px;
    font-weight: 700;
}
.refresh-mine-grid {
    display: flex;
    align-items: center;
    flex: 2;
}
.refresh-mine-grid img {
    width: 16px;
    margin: 0px 4px;
}
.flag-count-display {
    flex: 2;
}
.spacer {
    flex: 1;
}
`;
};
