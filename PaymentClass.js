"use strict";
const PaymentClass = function () {
  this.tableHeader = {
    'id': 'Номер',
    'date': 'Дата',
    'summa': 'Сумма',
    'client': 'Клиент',
    'comment': 'Комментарий',
  };
  this.emptyLine = {
    id: 0,
    date: new Date(),
    summa: 0,
    client: '',
    comment: ''
  };

  this.Data = [];
  this.Clients = new Set();

  this.Init = () => {
    this.getStorage();
  };

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
        this.Data = Data;

        this.fullClients(this.ulCategory);
        this.fullTable(Data);
        this.addButtonAdd(this.divMain, ['btn', 'btn-add']);
        this.addButtonSave(this.divMain, ['btn', 'btn-save']);        
       });
      } else {
        if (localStorage["pymentData"]) {
          const Data = JSON.parse(localStorage["pymentData"]);
          this.Data = Data;
          this.fullClients(this.ulCategory);
          this.fullTable(Data);
          this.addButtonAdd(this.divMain, ['btn', 'btn-add']);
          this.addButtonSave(this.divMain, ['btn', 'btn-save']);  
        }
      }
  };

  this.fullClients = (ul) => {
    this.getClients();
    
    for (const client of this.Clients) {
      const li = document.createElement('li');
      li.textContent = client;
      ul.appendChild(li);
      const itClientData = new Array();

      li.addEventListener('click', (env) => {
        const itClient = env.currentTarget.textContent;

        for (const data of this.Data) {
          if (data.client == itClient) {
            itClientData.push(data);
          }
        }

        this.fullTable(itClientData);
      });
    }
  };

  this.getClients= () => {
    for (const data of this.Data) {
      this.Clients.add(data.client);
    }
  };

  this.fullTable = (Data) => {
    this.clearTable();
    this.addTableHeader();
    if (Data) {
      const tbody= document.createElement("tbody");
      Data.forEach(element => {
        this.addNewRow(element, tbody);
      });
      this.table.appendChild(tbody);
    }
  };

  this.clearTable = () => {
    this.table.innerText='';
  }

  this.getDataFromTable = () => {
    this.Data= [];
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

  this.addNewRow = (element, tbody, isNew) => {
    const row = tbody.insertRow();

    if (isNew == true) {
      element.id = this.Data[this.Data.length-1].id;
      element.id++;

    }

    row.insertCell(0).appendChild(this.addInput(element.id, 'id', 'id', 'input-id'));
    row.insertCell(1).appendChild(this.addInput(element.date, 'date', 'date', 'input-date'));
    row.insertCell(2).appendChild(this.addInput(element.summa, 'number', 'summa', 'input-summa'));
    row.insertCell(3).appendChild(this.addInput(element.client, 'text', 'client', 'input-client'));
    row.insertCell(4).appendChild(this.addInput(element.comment, 'text', 'comment', 'input-comment'));

    if (isNew == true) {
      row.insertCell(5).appendChild(this.addButtonApply());
    } else {
      row.insertCell(5).appendChild(this.addButtonDel());
    }

    row.addEventListener('change', (env) => {
      const rowIndex = env.currentTarget.rowIndex;
      //const id = this.table.rows[rowIndex].cells[0].children[0].value;
      this.setRowDatatoData(rowIndex);
    });
  };

  this.setRowDatatoData = (rowIndex) => {
    const itRow = this.table.rows[rowIndex];
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
    
    this.Data.forEach( (element, ind) => {
      if (element.id == itData.id) {
        this.Data[ind] = itData;
      }
    })
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
    div.appendChild(btn);

    btn.addEventListener('click', (env) => {
      const tbody= document.createElement("tbody");
      this.addNewRow(this.emptyLine, tbody, true);
      this.table.appendChild(tbody);
    });
  };

  this.addButtonSave = (div, className) =>  {
    const btn = document.createElement('button');
    btn.classList.add(...className);
    btn.name = 'ButtonSave';
    btn.innerText = 'Сохранить';
    div.appendChild(btn);

    btn.addEventListener('click', (env) =>  {
      //this.getDataFromTable();
      this.setStorage();
    });
  };

  this.addButtonDel = () =>  {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-del');
    btn.name = 'ButtonDel';
    btn.innerText = 'X';

    btn.addEventListener('click', (env) =>  {
      const id = env.target.parentElement.parentElement.rowIndex;
      this.table.deleteRow(id);

      this.Data.forEach((element, index) => {
        if (element.id == id) {
          this.Data.splice(index, 1);
        }
      })
    })  
    
    return btn;
  };

  this.addButtonApply = () =>  {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-apply');
    btn.name = 'ButtonApply';
    btn.innerText = 'V';

    btn.addEventListener('click', (env) =>  {
      const id = env.target.parentElement.parentElement.rowIndex;

      const itRow = table.rows[id];
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
      });
    return btn;
  };  


};
