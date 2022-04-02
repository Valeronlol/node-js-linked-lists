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
        if (index < 0 || index > this.#size) {
            throw new Error(`${index} is out of range!`)
        }

        let current = this.#head
        let prev = null

        if (index === 0) {
            this.#head = current.next
        } else {
            // TODO починить функцию remove, чтобы она работала корректно
            // Пример в getData
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

    // O(n / 2)
    getData(index) {
        const mid = Math.round(this.#size / 2)

        if (index > mid) {
            // ищем с хвоста
            let current = this.#tail
            for (let i = this.#size - 1; i >= index; i--)  {
                if (i === index) {
                    return current.data
                }
                current = current.prev
            }
        } else {
            // ищем с головы
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

    // TODO вернуть средний индекс списка
    get listMid () {
        return this.#head
    }

    // TODO вернуть массив всех значений элементов
    // direction - можеть быть 0 или 1
    // Если 1, то результат должен быть упорядочен с head -> tail
    // Если 0 то, tail -> head
    toArray(direction = 1) {
        return []
    }

    // TODO удалить все элементы, значение которых уже встретилось в связанном списке.
    removeDuplicates () {

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

const linkedList = new DoublyLinkedList()
linkedList.append(20) // 0
linkedList.append(5) // 1
linkedList.append(30) // 2
linkedList.append(40) // 3
linkedList.append(50) // 4
linkedList.append(60) // 5
linkedList.append(70) // 6

const value = linkedList.getData(6)
console.log('value', value)
console.log('size', linkedList.size)
console.log('head', linkedList.head)
console.log('tail', linkedList.tail)
linkedList.printList()
