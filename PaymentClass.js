const PaymentClass = function () {
  this.tableHeader = {
    'date': 'Дата',
    'summa': 'Сумма',
    'client': 'Клиент',
    'comment': 'Комментарий',
  };
  this.emptyLine = {
    date: new Date(),
    summa: 0,
    client: '',
    comment: ''
  };

  //this.Data = [];

  this.setStorage = () => {
    if (chrome.storage) {
      chrome.storage.sync.set({"pymentData": this.Data});
    } else {
      localStorage["pymentData"] = JSON.stringify(this.Data);
    }
  };

  this.getStorage = () => {
    if (chrome.storage) {
       chrome.storage.sync.get(["pymentData"], (result) => {
        const Data = result.pymentData;
        this.fullTable(Data);
       });
      } else {
        if (localStorage["pymentData"]) {
          const Data = JSON.parse(localStorage["pymentData"]);
          this.fullTable(Data);
        }
      }
  };

  this.fullTable = (Data) => {
    this.addTableHeader();
    if (Data) {
      Data.forEach(element => {
        this.addNewRow(element);
      });
    }
  };

  this.getDataFromTable = () => {
    const table = this.table;
    for (let row=1; row < table.rows.length; row++) 
      {
        const itRow = table.rows[row];
        const itData = {};
        for (let cell=0; cell < itRow.cells.length; cell++) 
        {
          const itCell = itRow.cells[cell];
          const cildNode = itCell.childNodes[0];
          if (cildNode.nodeName == 'INPUT') {
            itData[cildNode.name] = cildNode.value
          } else {
            itData[cildNode.name] = cildNode.textContent;
          }
        }
        this.Data.push(itData);
      }
  };

  this.addTableHeader = () => {
    const header = this.table.createTHead();
    const row = header.insertRow(0);    
    for (const key in this.tableHeader) {
      row.insertCell().textContent = this.tableHeader[key];
    }
    row.insertCell().textContent = 'Удалить';
  }

  this.addNewRow = (element) => {
      const row = this.table.insertRow();
      row.insertCell(0).appendChild(this.addInput(element.date, 'date', 'date', 'input-date'));
      row.insertCell(1).appendChild(this.addInput(element.summa, 'number', 'summa', 'input-summa'));
      row.insertCell(2).appendChild(this.addInput(element.client, 'text', 'client', 'input-client'));
      row.insertCell(3).appendChild(this.addInput(element.comment, 'text', 'comment', 'input-comment'));
      row.insertCell(4).appendChild(this.addButtonDel());
  };

this.addInput = (value, type, name, className) =>  {
  const input = document.createElement('input');
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.value = value;
  input.valueAsDat = value;
  input.classList.add(className);

  return input;
};

  this.addButtonAdd = (div, className) =>  {
    const btn = document.createElement('button');
    btn.classList.add(...className);
    btn.name = 'ButtonAdd';
    btn.innerText = 'Добавить запись';

    btn.addEventListener('click', (env) => {
      this.addNewRow (this.table, this.emptyLine);
    });

    div.appendChild(btn);
  };

  this.addButtonSave = (div, className) =>  {
    const btn = document.createElement('button');
    btn.classList.add(...className);
    btn.name = 'ButtonSave';
    btn.innerText = 'Сохранить';

    btn.addEventListener('click', (env) =>  {
      this.getDataFromTable();
      this.setStorage();
    });
  };

    this.addButtonDel = () =>  {
      const btn = document.createElement('button');
      btn.classList.add('btn', 'btn-del');
      btn.name = 'ButtonDel';
      btn.innerText = 'X';
  
      btn.addEventListener('click', (env) =>  {
        this.table.deleteRow(env.target.parentElement.parentElement.rowIndex);
      });  
      
      return btn
  };
};
