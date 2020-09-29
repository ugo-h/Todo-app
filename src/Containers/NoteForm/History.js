class Node{
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
    insert(value) {
        this.next = new Node(value);
        this.next.prev = this;
        return this.next;
    }
}

export default Node;