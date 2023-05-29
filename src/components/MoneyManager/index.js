import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const filteredTransactions = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({transactionsList: filteredTransactions})
  }

  getExpenses = () => {
    const {transactionsList} = this.state

    let expenses = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenses += eachTransaction.amount
      }
    })

    return expenses
  }

  getIncome = () => {
    const {transactionsList} = this.state

    let income = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        income += eachTransaction.amount
      }
    })
    return income
  }

  getBalance = () => {
    const {transactionsList} = this.state

    let income = 0
    let expenses = 0
    let balance = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        income += eachTransaction.amount
      } else {
        expenses += eachTransaction.amount
      }
      balance = income - expenses
    })
    return balance
  }

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachOption => eachOption.optionId === optionId,
    )

    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  render() {
    const {titleInput, amountInput, transactionsList, optionId} = this.state
    const income = this.getIncome()
    const expenses = this.getExpenses()
    const balance = this.getBalance()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="greetings-container">
            <h1 className="title">Hi, Richard</h1>
            <p className="greet">
              Welcome back to your
              <span className="highlight-text"> Money Manager</span>
            </p>
          </div>

          <MoneyDetails
            balanceAmount={balance}
            incomeAmount={income}
            expensesAmount={expenses}
          />

          <div className="bottom-section-container">
            <div className="add-transaction-container">
              <h1 className="add-transaction-title">Add Transaction</h1>
              <form onSubmit={this.onAddTransaction} className="form-container">
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  placeholder="TITLE"
                  id="title"
                  onChange={this.onTitleChange}
                  value={titleInput}
                  className="input input-1"
                />

                <label htmlFor="amount">AMOUNT</label>
                <input
                  type="text"
                  placeholder="AMOUNT"
                  id="amount"
                  onChange={this.onAmountChange}
                  value={amountInput}
                  className="input input-2"
                />

                <label htmlFor="select">TYPE</label>
                <select
                  onChange={this.onChangeType}
                  id="select"
                  className="input input-3"
                  value={optionId}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="custom-btn">
                  Add
                </button>
              </form>
            </div>

            <div className="history-container">
              <h1 className="history-title">History</h1>
              <ul className="history-items-container">
                <li className="heading-tab">
                  <p className="tab-title">Title</p>
                  <p className="tab-amount">Amount</p>
                  <p className="tab-type">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
