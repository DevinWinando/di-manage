<?php

namespace App\Http\Controllers;

use App\Models\Directory;
use Illuminate\Http\Request;

class DirectoryController extends Controller
{
    public function index()
    {
        $all = Directory::whereNull('parent_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'All directories',
            'data' => $all
        ]);        
    }

    public function show($id)
    {
        $directory = Directory::with('parent', 'children')->find($id);

        if (!$directory) {
            return response()->json([
                'status' => 'error',
                'message' => 'Directory not found',
                'data' => null
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Directory found',
            'data' => $directory
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'parent_id' => 'nullable|exists:directories,id'
        ]);

        $directory = Directory::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Directory created',
            'data' => $directory
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'parent_id' => 'nullable|exists:directories,id'
        ]);

        $directory = Directory::find($id);

        if (!$directory) {
            return response()->json([
                'status' => 'error',
                'message' => 'Directory not found',
                'data' => null
            ]);
        }

        $directory->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Directory updated',
            'data' => $directory
        ]);
    }

    public function destroy($id)
    {
        $directory = Directory::find($id);

        if (!$directory) {
            return response()->json([
                'status' => 'error',
                'message' => 'Directory not found',
                'data' => null
            ]);
        }

        $directory->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Directory deleted',
            'data' => null
        ]);
    }

    public function move(Request $request, $id)
    {
        $request->validate([
            'parent_id' => 'required|exists:directories,id'
        ]);

        $directory = Directory::find($id);

        if (!$directory) {
            return response()->json([
                'status' => 'error',
                'message' => 'Directory not found',
                'data' => null
            ]);
        }

        $directory->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Directory moved',
            'data' => $directory
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $directories = Directory::where('name', 'like', '%' . $request->name . '%')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Search result',
            'data' => $directories
        ]);
    }

    public function storeFile(Request $request, $id)
    {
        $request->validate([
            'file' => 'required|file'
        ]);

        $file = $request->file('file');
        $file->storeAs('files', $file->getClientOriginalName());

        return response()->json([
            'status' => 'success',
            'message' => 'File stored',
            'data' => null
        ]);
    }
}
