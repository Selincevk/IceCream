import { render, screen } from "@testing-library/react";
import AmountPicker from "../components/modal/AmountPicker";
import CartItem from "../components/modal/CartItem";


jest.mock("../components/modal/AmountPicker", () => () => <h1>Picker</h1>)

const cupItem = {
    name: "İtalyan Karameli",
    image:
      "/italyan.png",
    price: 28,
    id: "f6b2",
    type: "cup",
    amount : 2
}

const cornetItem = {
    name: "İtalyan Karameli",
    image:
      "/italyan.png",
    price: 28,
    id: "f6b2",
    type: "cornet",
    amount: 3
}

it("item type 'cup' olduğunda doğru render ediliyor", () => {
  // bileşeni renderla
  render(<CartItem item={cupItem} />);

  // resmin doğru render edilidiğini kontrol et
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", cupItem.image);

  // tip yazısı doğru mu kontrol et
  screen.getByText("Bardakta");

  // toplam fiyatı doğru mu kontrol et
  screen.getByText(`${cupItem.price * cupItem.amount}₺`);
});

it("item type 'cornet' olduğunda doğru render ediliyor", () => {
  // bileşeni renderla
  render(<CartItem item={cornetItem} />);

  // resmin doğru render edilidiğini kontrol et
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", cornetItem.image);

  // tip yazısı doğru mu kontrol et
  screen.getByText("Külahta");

  // toplam fiyatı doğru mu kontrol et
  screen.getByText(`${cornetItem.price * cornetItem.amount}₺`);
});