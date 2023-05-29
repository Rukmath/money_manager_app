import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container">
      <div className="money-container box-1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="money-image"
        />
        <div>
          <p className="balance-text">Your Balance</p>
          <p data-testid="balanceAmount" className="balance-amount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="money-container box-2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
          className="money-image"
        />
        <div>
          <p className="balance-text">Your Income</p>
          <p className="balance-amount" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="money-container box-3">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          alt="expenses"
          className="money-image"
        />
        <div>
          <p className="balance-text">Your Expenses</p>
          <p className="balance-amount" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
