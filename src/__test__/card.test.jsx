import { render,screen } from "@testing-library/react"
import Card from "../components/card"
import { mockData } from "../utils/constants"
import { useDispatch } from "react-redux"
import userEvent from "@testing-library/user-event";
import { addToCart } from "../redux/cartSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));


describe('Card Testleri', () => {
//   !  Usedispatchin döndürdüğü dispatch methodunun sahtesini oluşturalım.
const dispatchMock = jest.fn()
// ! useDispatch her çağrılığında sahte dispatch methodu ile return et
beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock)
})


test('item propuna göre veriler ekrana basılıyor mu ? ', () => {
  render(<Card item={mockData[0]}/>)

screen.getByText(mockData[0].name) // başlık
screen.getByText(`₺${mockData[0].price} / top`)
 // fiyat

// resmin kaynağı doğru geliyor mu ?
const img =screen.getByAltText(mockData[0].name)
expect(img).toHaveAttribute("src", mockData[0].image);
})

test('tipin seçili olma durumuna göre buton görünürlüğü değişir', async () => {
// ! UserEvent kurulumu
const user = userEvent.setup()
    render(<Card item={mockData[0]}/>)

    // sepete ekle butonunu ekrandan al
   const basketBtn = screen.getByRole("button", {name: "Sepete Ekle"})

//  Sepete ekle butonu görünmezliği
expect(basketBtn).toHaveClass("invisible")

// külahta butonunu al
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });

// külahta butonuna tıkla
await user.click(cornetBtn)

// sepete ekle butonu görünür
expect(basketBtn).not.toHaveClass("invisible")

// külahta butonuna tıkla
await user.click(cornetBtn)
// sepete ekle butonu görünmez
expect(basketBtn).toHaveClass("invisible")


})

test('sepete ekle butonuna tıklanıldığında aksiyon dispatch edilir', async () => {
   const user = userEvent.setup();

    // bileşeni renderla
    render(<Card item={mockData[0]} />);

    // külahta butonunu al ve tıkla
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    await user.click(cornetBtn);

    // sepete ekle butonunu al ve tıkla
    const basketBtn = screen.getByRole("button", { name: /sepete/i });
    await user.click(basketBtn);

    // dispatch'in çağrılığını doğrula
    expect(dispatchMock).toHaveBeenCalledTimes(1);

    // doğru aksiyon ve payload ile çağrıldığını doğrula
    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({
        item: mockData[0],
        selectedType: "cornet",
      })
    );
})



})
