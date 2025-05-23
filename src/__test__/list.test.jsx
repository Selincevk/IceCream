import { render,screen, waitFor, queryByTestId } from "@testing-library/react"
import List from "../components/list"
import api from "../utils/api"
import Card from "../components/card"
import {mockData} from "../utils/constants"


jest.mock("../utils/api")
// card componentini mockla
jest.mock("../components/card")

describe("List bileşeni testler", () => {
    afterEach(() => {
    // her testten sonra mock ayarlarını sıfırla
        jest.clearAllMocks()
    })
test('apiden cevap gelmediyse ekrana loader basılır', async () => {
api.get.mockResolvedValue({data: []}) // api isteği atılınca cevap dönmesi için 

render(<List/>)

// ekranda loader vardır 
screen.getByTestId("loader")

// belirli bir sürenin ardından ekrandan loader gider
await waitFor(() => {
expect(screen.queryByTestId("loader")).toBeNull() 
})
})

test('apiden hata gelirse ekrana error basılır', async () => {
  api.get.mockRejectedValue(new Error ("hata oldu"))

  render(<List/> )

  await waitFor(() => screen.getByTestId("error"))
})


test('apiden başarılı cevap gelirse ekrana cardlar basılır', async () => {
   // card'ların yerine basılcak içeriği belirle
    Card.mockImplementation(({ item }) => <div>{item.name}</div>);

    // api.get isteği atılınca dondurma verilerini döndür
    api.get.mockResolvedValue({ data: mockData });

    // bileşeni renderla
    render(<List />);

    // belirli bir sürenin ardından api.get'den dönen dizideki her bir veri için ekrana bir tane kart basılır
    await waitFor(() => {
      mockData.forEach((item) => {
        screen.getByText(item.name);
      });
    });
})
})


