const assert = require('assert')

class Node {
    constructor(data, next = null) {
        this.data = data
        this.next = next
    }
}

class LinkedList {
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
            this.#tail.next = newNode
            this.#tail = newNode
        }

        this.#size++
    }

    // O(n)
    remove (index) {
        if (index < 0 || index > this.#size) {
            throw new Error(`${index} is out of range!`)
        }

        let current = this.#head
        let prev = null

        if (index === 0) {
            this.#head = current.next
        } else {
            for (let i = 1; i <= index; i++)  {
                prev = current
                current = prev.next
                if (index === i) {
                    prev.next = current.next
                }
            }
        }

        this.#size--
    }

    // O(n)
    getData(index) {
        if (index < 0 || index > this.#size) {
            throw new Error(`${index} is out of range!`)
        }

        let current = this.#head
        for (let i = 0; i <= index; i++)  {
            if (i === index) {
                return current.data
            }
            current = current.next
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

const linkedList = new LinkedList()
linkedList.append(20) // 0
linkedList.append(5) // 1
linkedList.append(30) // 2
linkedList.append(40) // 3
linkedList.remove(1)

const value = linkedList.getData(1)
console.log('size', linkedList.size)
console.log('head', linkedList.head)
console.log('tail', linkedList.tail)
linkedList.printList()