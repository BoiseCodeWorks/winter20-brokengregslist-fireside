import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from '../Services/AxiosService.js';

class CarService {
  async getCars() {
    let res = await api.get("cars")
    console.log(res.data)
    ProxyState.cars = res.data.map(rawCarData => new Car(rawCarData))

  }

  async postCar(newCar) {
    let res = await api.post("cars", newCar)
    console.log(res.data)
    // this.getCars()
    let temp = ProxyState.cars
    temp.push(new Car(res.data))
    ProxyState.cars = temp
  }


  async editCar(editedCar) {
    let res = await api.put("cars/" + editedCar.id, editedCar)
    console.log(res.data)
    // this.getCars()
    let temp = ProxyState.cars
    let indexToRemove = temp.findIndex(c => c.id == editedCar.id)
    temp.splice(indexToRemove, 1, new Car(res.data))
    ProxyState.cars = temp

  }



  async deleteCar(carId) {
      let res = await api.delete("cars/" + carId)
      console.log(res.data)
      // this.getCars()

   
      ProxyState.cars = ProxyState.cars.filter(c => c.id != carId)

  }
}

export const carService = new CarService();

