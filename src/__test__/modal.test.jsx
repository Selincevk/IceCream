import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import userEvent from "@testing-library/user-event";
import { mockCartData } from "../utils/constants";

// useSelector mocku
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// CartInfo bileşeni mock
jest.mock("../components/modal/CartInfo", () => ({
  __esModule: true,
  default: ({ cart }) => <div>CartInfo mock: {cart.length}</div>,
}));

// CartItem bileşeni mock
jest.mock("../components/modal/CartItem", () => ({
  __esModule: true,
  default: ({ item }) => <div>{item.name}</div>,
}));

describe("Modal Component", () => {
  const closeMock = jest.fn();

  test("isOpen propuna göre modal ekrana basılır veya basılmaz", () => {
    useSelector.mockReturnValue({ cart: [] });

    const { rerender, queryByTestId, getByTestId } = render(
      <Modal isOpen={false} close={closeMock} />
    );

    // ilk durumda görünmemeli
    expect(queryByTestId("modal")).toBeNull();

    // tekrar renderla ve isOpen true yap
    rerender(<Modal isOpen={true} close={closeMock} />);

    // artık modal görünmeli
    expect(getByTestId("modal")).toBeInTheDocument();
  });

  test("x butonuna tıklanınca close fonksiyonu çalışır", async () => {
    const user = userEvent.setup();

    useSelector.mockReturnValue({ cart: [] });

    render(<Modal isOpen={true} close={closeMock} />);

    const closeBtn = screen.getByTestId("close");

    await user.click(closeBtn);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("sepet doluluk durumuna göre ekrana uyarı basılır", () => {
    useSelector.mockReturnValue({ cart: [] });

    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    // boş sepet uyarısı var mı
    expect(screen.getByText(/sepette/i)).toBeInTheDocument();

    // dolu sepeti mockla
    useSelector.mockReturnValue({ cart: mockCartData });

    rerender(<Modal isOpen={true} close={closeMock} />);

    // boş sepet uyarısı artık olmamalı
    expect(screen.queryByText(/sepette/i)).toBeNull();
  });

  test("sepet doluysa her bir eleman için ekrana kart basılır", () => {
    useSelector.mockReturnValue({ cart: mockCartData });

    render(<Modal isOpen={true} close={closeMock} />);

    mockCartData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
