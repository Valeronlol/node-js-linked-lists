const assert = require('assert')

class Node {
    constructor(data, next = null, prev = null) {
        this.data = data
        this.next = next
        this.prev = prev
    }
}

class DoublyLinkedList {
    #size = 0
    #head = null
    #tail = null

    // O(1)
    append (data) {
        const newNode = new Node(data)

        if (!this.#head) {
            this.#head = newNode
            this.#tail = newNode
        } else {
            newNode.prev = this.#tail
            this.#tail.next = newNode
            this.#tail = newNode
        }

        this.#size++
    }

    // O(n)
    remove (index) {
        if (index < 0 || index > this.#size - 1) {
            throw new Error(`${index} is out of range!`)
        }

        if (index === 0) {
            this.#head = this.#head.next
            this.#head.prev = null
        }

        if (index === this.#size - 1) {
            this.#tail = this.#tail.prev
            this.#tail.next = null

        } else {
            const mid = Math.round(this.#size / 2)

            if (index > mid) {
                let current = this.#tail
                for (let i = this.size - 2; i >= index; i--) {
                    let next = current
                    current = next.prev
                    if (i === index) {
                        current.prev.next = current.next
                        current.next.prev = current.prev
                    }
                }

            } else {
                let current = this.#head
                for (let i = 1; i <= index; i++) {
                    let prev = current
                    current = prev.next
                    if (i === index) {
                        prev.next = current.next
                    }
                }
            }
        }

        this.#size--
    }

    // O(n / 2)
    getData(index) {
        if (index < 0 || index > this.#size) {
            throw new Error(`${index} is out of range!`)
        }

        const mid = Math.round(this.#size / 2)

        if (index > mid) {
            let current = this.#tail
            for (let i = this.#size - 1; i >= index; i--)  {
                if (i === index) {
                    return current.data
                }
                current = current.prev
            }
        } else {
            let current = this.#head
            for (let i = 0; i <= index; i++)  {
                if (i === index) {
                    return current.data
                }
                current = current.next
            }
        }
    }

    get size () {
        return this.#size
    }

    get tail () {
        return this.#tail
    }

    get head () {
        return this.#head
    }

    get listMid () {
        return Math.round((this.#size - 1) / 2)
    }

    toArray(direction = 1) {
        let array = []
        if (direction === 1) {
            let current = this.#head

            for(let i = 1; i <= this.#size; i++) {
                let itemOfArray = current.data
                array.push(itemOfArray)
                current = current.next
            }
        } 
        else if (direction === 0) {
            let current = this.#tail

            for(let i = this.#size; i > 0; i--) {
                let itemOfArray = current.data
                array.push(itemOfArray)
                current = current.prev
            }
        } else {
            throw new Error(`${direction} is out of range!`)
        }
        return array
    }

    removeDuplicates () {
       const array = this.toArray()
       array.filter((item, index) => {
           if (array.indexOf(item) !== index) {
            this.remove(index)
           }
       })
    }

    printList () {
        let current = this.#head;
        let text = `[${current.data}] `

        while (current.next) {
            current = current.next
            text += `[${current.data}] `
        }

        console.log(text)
    }
}
