<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MaintScheme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use phpDocumentor\Reflection\Types\Integer;

class MaintSchemeController extends Controller
{
    public function show($id){
        return response()->json(MaintScheme::find($id));
    }
    public function find(Request $request) {
        $conditions = array(
            'page' => $request->paginator['page'],
            'pageSize' => $request->paginator['pageSize'],
            'sortColumn' => $request->sorting['column'],
            'sortDirection' => $request->sorting['direction'],
            'searchTerm' => $request->searchTerm,
            'filter' => $request->filter,
        );
        if ($conditions['sortColumn'] == 'id') {
            $conditions['sortColumn'] = 'maintSchemeId';
        }

        $fields = [
            'MaintenanceScheme.*'
        ];

        $data = MaintScheme::select($fields)->with('person_created', 'person_updated');
        if ($conditions['filter']) {
            $data = $data->where('maintSchemeActive', $conditions['filter']['maintSchemeActive']);
        }
        if ($conditions['searchTerm'] != '') {
            $data = $data->whereLike(['maintSchemeName', 'maintSchemeRemark'], $conditions['searchTerm']);
        }
        $data = $data->orderBy($conditions['sortColumn'], $conditions['sortDirection'])
            ->paginate($conditions['pageSize'],['*'], 'page', $conditions['page']);
        return response()->json([
            'items' => $data->items(),
            'total' => $data->total()
        ]);
    }

    public function store(Request $request)
    {
        $arrInputs = $request->only(['maintSchemeCode', 'maintSchemeName' , 'costPerVisit', 'intervalOfVisit', 'maintSchemeRemark']);
        $validation = Validator::make($arrInputs, MaintScheme::$rules );

        if (!$validation->passes()) {
            $error = $validation->errors();
            return response()->json([
                'messages' => 'validation failed',
                'errors' => $error
            ], 400); // Bad request
        }

        $newRecord = new MaintScheme($arrInputs);
        $newRecord->save();
        return response()->json([
            'messages' => 'Record created successfully!',
            'data' => $newRecord
        ]);
    }

    public function update(Request $request, $id)
    {
        $arrInputs = $request->only(['maintSchemeCode', 'maintSchemeName' , 'costPerVisit', 'intervalOfVisit', 'maintSchemeRemark']);
        $validation = Validator::make($arrInputs, MaintScheme::$rules );
        if (!$validation->passes()) {
            $error = $validation->errors();
            return response()->json([
                'messages' => 'validation failed',
                'errors' => $error
            ], 400); // Bad request
        }

        $record = MaintScheme::find($id);
        if (is_null($record)) {
            return response()->json([
                'messages' => "Cannot find record with id of '$id'.",
            ], 404); // record not found
        }

        $record->update($arrInputs);
        return response()->json([
            'messages' => "Record " . $record->maintSchemeName . " is successfully updated.",
        ], 200); // successful
    }

    public function destroy($id)
    {
        $record = MaintScheme::find($id);

        if (is_null($record)) {
            return response()->json([
                'messages' => "Cannot find record with id of '$id'.",
                'errors' => []
            ], 404); // record not found
        }

        $record->delete();
        return response()->json([
            'messages' => 'record '. $record->maintSchemeName .' is successfully deleted.',
        ], 200); // successful
    }

    public function deleteItems(Request $request) {
        MaintScheme::find($request->ids)->each(function($record, $key) {
            $record->delete();
        });
        return response()->json([
            'messages' => 'records are successfully deleted.',
        ], 200); // successful
    }

    public function updateStatus(Request $request) {
        $records = MaintScheme::find($request->ids);
        foreach ($records as $record) {
            $record->update(['maintSchemeActive' => $request->status]);
        }
        return response()->json([
            'messages' => 'update status successfully.',
        ], 200); // successful
    }
}
