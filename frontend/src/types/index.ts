export interface Cliente {
    id?: number;
    nombre: string;
    genero: string;
    edad: number;
    identificacion: string;
    direccion: string;
    telefono: string;
    clienteId: string;
    contrasena: string;
    estado: boolean;
}

export interface Cuenta {
    id?: number;
    numeroCuenta: string;
    tipoCuenta: string;
    saldoInicial: number;
    estado: boolean;
    clienteId?: number;
}

export interface Movimiento {
    id?: number;
    fecha?: string;
    tipoMovimiento: string;
    valor: number;
    saldo?: number;
    cuentaId?: number;
}

export interface Reporte {
    fecha: string;
    cliente: string;
    numeroCuenta: string;
    tipo: string;
    saldoInicial: number;
    estado: boolean;
    transaccion: number;
    saldoDisponible: number;
}

export interface BaseResponse<T> {
    id: string; // UUID
    'codigo-mensaje': string;
    mensaje: string;
    fecha: string;
    data: T;
}
