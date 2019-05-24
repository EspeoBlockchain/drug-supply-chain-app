import scannerService from '../scannerService';
global.alert = jest.fn();

describe('scannerService - tryParseData', () => {
    it('Should return null if pass invalid JSON', () => {
        const result = scannerService.tryParseData("Invalid JSON");
        expect(result).toBeNull();
    });
    
    it('Should return JSON when valid data passed', () => {
        const result = scannerService.tryParseData('{ "file": "JSON", "size": 1, "valid": true }');
        expect(result).toMatchObject({
            file: 'JSON',
            size: 1,
            valid: true
        })
    });
});

describe('scannerService - validateObject', () => {
    const testedObject = {
        name: 'object',
        id: 1,
        valid: true
    }
    it('Should return false when expected different properties', () => {
        const valid = scannerService.validateObject(testedObject, ['differentProp', 'name']);
        expect(valid).toBe(false);
    });

    it('Should return true when checking some properties', () => {
        const valid = scannerService.validateObject(testedObject, ['name', 'valid']);
        expect(valid).toBe(true);
    });
});

describe('scannerService - updateObject', () => {
    beforeEach(() => {
        return oldObj = {
            name: 'oldName',
            age: 1,
            isOld: true
        }
    });

    it('Should add new properties to old object', () => {
        const newObj = scannerService.updateObject(oldObj, { newProp: 'value' });
        expect(newObj).toMatchObject({
            name: 'oldName',
            age: 1,
            isOld: true,
            newProp: 'value'
        })
    });

    it('Should update properties with new values', () => {
        const newObj = scannerService.updateObject(oldObj, { name: 'newName', age: 2, isOld: false });
        expect(newObj).toMatchObject({
            name: 'newName',
            age: 2,
            isOld: false
        })
    });


})

