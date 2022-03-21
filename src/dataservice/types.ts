export class Many<T> {
    constructor(readonly status: number, readonly data: T[]) {
    }
}

export class Just<T> {
    constructor(readonly code: number, readonly data: T) {
    }
}

export class Actor {
    constructor(readonly id: string, readonly name: string) {
    }
}

export class Task {
    constructor(readonly title: string, readonly description: number, readonly created: string,
                readonly due_date: string, readonly assignee: string) {
    }
}


export class Status {
    constructor(readonly status: string, readonly message: string) {
    }
}