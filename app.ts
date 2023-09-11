import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { genSaltSync, hashSync } from 'bcrypt';
// import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    salt = genSaltSync(10)

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        var hash = hashSync(user.passoword, this.salt);
        user.passoword = hash;
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }

    ListUser(): void{
        this.users.some(pUser => {
            console.log("Nome: " + pUser.name)
            console.log("Email: " + pUser.email)
            console.log("Id: " + pUser.id)
            console.log("Senha: " + pUser.passoword + "\n")
        })
    }

    ListRent(): void{
        this.rents.some(pRent => {
            console.log("User: " + pRent.user.name)
            console.log("Bike: " + pRent.bike.name)
            console.log("Date from: " + pRent.dateFrom)
            console.log("Date to: " + pRent.dateTo)
            console.log("Date returned: " + pRent.dateReturned + "\n")
        })
    }

    ListBike(): void{
        this.bikes.some(pBike => {
            console.log("Nome: " + pBike.name)
            console.log("Type: " + pBike.type)
            console.log("Body Size: " + pBike.bodySize)
            console.log("Max Load: " + pBike.maxLoad)
            console.log("Rate: " + pBike.rate)
            console.log("Description: " + pBike.description)
            console.log("Ratings: " + pBike.ratings)
            console.log("Id: " + pBike.id + "\n")
        })
    }

    //função retorna verdadeiro caso esteja tudo certo, e falso se não
    Authentication(id: string, senha: string){
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].id === id){
                var verifica: string = hashSync(senha, this.salt);
                console.log(verifica)
                if(verifica === this.users[i].passoword){
                    return true
                }
                else{
                    throw new Error('Senha errada.')
                }
            }
        }
        throw new Error('Email não cadastrado.')
    }
}

        // for(const rUser of this.users){
        //     if(rUser.email === user.email){
        //         throw new Error('Duplicate user.')
        //     }
        // }
        // this.users.push(user)

    //     if(this.users.some(rUser => {
    //         return rUser.email == user.email
    //     })) {
    //         throw new Error('User already registered.')
    //     }
    //     user.id = crypto.randomUUID()
    //     this.users.push(user)
    // }

}
