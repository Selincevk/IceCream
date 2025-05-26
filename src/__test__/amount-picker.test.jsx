import { render,screen} from "@testing-library/react"
import { useDispatch } from "react-redux"
import AmountPicker from "../components/modal/AmountPicker"
import userEvent from "@testing-library/user-event"
import { addToCart, deleteFromCart } from "../redux/cartSlice"


// useDispatch mockla
jest.mock("react-redux", () => ({
    useDispatch: jest.fn()
}))

const cartItem = {
     name: "İtalyan Karameli",
    image:
      "/italyan.png",
    price: 28,
    id: "f6b2",
    type:"cup",
    amount: 2
}

describe("AmountPicker", () => {
const mockDispatch = jest.fn()
    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch)
    })
afterEach(() => {
    jest.clearAllMocks()
})
    
test('Bileşen item.amount değerini doğru şekilde render eder ', () => {
  render(<AmountPicker item={cartItem} />);

screen.getByText(cartItem.amount)
})



test('sol butona tıklanınca deleteFrom aksiyonu çalışır', async () => {
    const user = userEvent.setup()

    render(<AmountPicker item={cartItem} />);

    const btn = screen.getByRole("button", {name: "-"})

    await user.click(btn)

    // aksiyon düzgün çalıştı mı ?
    expect(mockDispatch).toHaveBeenCalledWith(deleteFromCart(cartItem))
})



test('sağ butona tıklanınca addToCart aksiyonu çalışır ', async () => {
    // userEvent
    const user = userEvent.setup()

    render(<AmountPicker item={cartItem} />);

   const btn=  screen.getByRole("button", {name: "+"})

    await user.click(btn)

    expect(mockDispatch).toHaveBeenCalledWith(addToCart({ item: cartItem, selectedType : cartItem.type}))
})


})